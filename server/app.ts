import express from 'express';
import path from 'path';
import DatabaseController from './database.js';
import luxon from 'luxon';
const {DateTime} = luxon;
import express_validator from 'express-validator';
const {body, validationResult} = express_validator;
import session from 'express-session';
import {MainData} from '../interfaces/MainData'
import bodyParser from 'body-parser';

const invalidPermissions = 'You are not permitted to edit, sorry!'

import dotenv from 'dotenv';
import { StuffyMenuData } from '../interfaces/StuffyMenuData.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET!,
    resave: true,
    cookie: {sameSite: 'lax'},
    saveUninitialized: false
}))

async function menuRetrieve(req: any): Promise<MainData> {
    try {
         var menuResult: Array<StuffyMenuData> = await new DatabaseController(process.env.DATABASE_URL!).menuResult()
         let stevenStuffy: StuffyMenuData, monicaStuffy: StuffyMenuData;
         [stevenStuffy, monicaStuffy] = await stuffyOfTheDay(menuResult);
         return {
              stevenStuffy: stevenStuffy,
              monicaStuffy: monicaStuffy,
              options: menuResult,
              loggedIn: req.session.canEdit,
         }
    }
    catch {
         return Promise.reject("ERROR: Something went wrong retrieving items from the db");
    }
}

async function stuffyOfTheDay(stuffies: Array<StuffyMenuData>) : Promise<[StuffyMenuData, StuffyMenuData]>  {
    let stevenStuffies = []
    let monicaStuffies = []
    var [anchorDateMonica, anchorDateSteven] = await getDate()
    let currentDate = getCurrentDate()
    for (const num in stuffies) {
         if (stuffies[num].owner === "Monica") {
              monicaStuffies.push(stuffies[num])
         }
         else if (stuffies[num].owner === "Steven") {
              stevenStuffies.push(stuffies[num])
         }
    }
    let dateDifferenceSteven = Math.floor((currentDate.valueOf() - anchorDateSteven) / (1000 * 60 * 60 * 24)) % stevenStuffies.length
    let dateDifferenceMonica = Math.floor((currentDate.valueOf() - anchorDateMonica) / (1000 * 60 * 60 * 24)) % monicaStuffies.length
    let stevenStuffy = stevenStuffies[dateDifferenceSteven]
    let monicaStuffy = monicaStuffies[dateDifferenceMonica]
    //console.log(anchorDateMonica)
    //console.log(monicaStuffies)
    console.log(dateDifferenceMonica)
    console.log(monicaStuffy)
    return [stevenStuffy, monicaStuffy]
}

async function findJSON(name: string, list: Array<any>) {
    for (var i = 0; i < list.length; i++) {
         if (list[i].person === name) {
              return list[i]
         }
    }
}

async function getDate() {
    var anchorDates: any = await new DatabaseController(process.env.DATABASE_URL!).command('Select person, date FROM AnchorDates;')
    anchorDates = anchorDates.rows
    var monica = await findJSON("Monica", anchorDates)
    var steven = await findJSON("Steven", anchorDates)
    monica = DateTime.fromJSDate(monica.date, { zone: 'UTC' })
    steven = DateTime.fromJSDate(steven.date, { zone: 'UTC' })
    return [monica, steven]
}

function getCurrentDate() {
    var currentDate = DateTime.local().setZone("America/Toronto")
    currentDate = currentDate.setZone("UTC", { keepLocalTime: true })
    return currentDate
}

async function manipulateDatabase(req: any, res: any, update: any) {
    if (await isInvalid(req)) {
         return res.send({ msg: 'Invalid Fields' })
    }

    if (req.session.canEdit) {
         let stuffies: Array<StuffyMenuData> = await new DatabaseController(process.env.DATABASE_URL!).menuResult();
         if (update) {
               let subject : StuffyMenuData = stuffies!.find((stuffy: StuffyMenuData) => (stuffy.id == req.params.id))!;
               if ((subject.name == req.body.name && subject.animal_type == req.body.animalType) || !(await alreadyExists(req.body.name, req.body.animalType, stuffies))) {
                    
                    let sotD = (await currentSotD(subject.owner, stuffies))!;
                    let query = 'UPDATE stuffies SET name = $1, animal_type = $2, image = $3, name_origin = $4, origin = $5, other_notes = $6 WHERE id = $7'
                    let values = [req.body.name, req.body.animalType, req.body.image, req.body.nameOrigin, req.body.origin, req.body.otherNotes, req.params.id]
                    await new DatabaseController(process.env.DATABASE_URL!).command(query, values)

                    await keepStuffyofTheDayUpdate(sotD.id, subject.owner)
               } else {
                    return res.send({ msg: "Another stuffy of the same name already exists!" })
               }
         }
         else if (!(await alreadyExists(req.body.name, req.body.animalType, stuffies))) {
              var sotD = (await currentSotD(req.body.owner, stuffies))!;

              var query = 'INSERT INTO stuffies (name, animal_type, image, owner, name_origin, origin, other_notes) VALUES ($1, $2, $3, $4, $5, $6, $7)'
              var values = [req.body.name, req.body.animalType, req.body.image, req.body.owner, req.body.nameOrigin, req.body.origin, req.body.otherNotes]
              await new DatabaseController(process.env.DATABASE_URL!).command(query, values)
              await keepStuffyofTheDay(sotD.id, req.body.owner)
         } else {
              return res.send({ msg: "This stuffy already exists!" })
         }

         res.send({ msg: 'Success' })
    }
    else {
         res.send({ msg: invalidPermissions })
    }
}


async function currentSotD(owner: string, stuffies: Array<StuffyMenuData>) {
    let stevenStuffy, monicaStuffy
    [stevenStuffy, monicaStuffy] = await stuffyOfTheDay(stuffies);
    console.log(owner)
    if (owner == "Steven") {
         return stevenStuffy;
    } else if (owner == "Monica") {
         return monicaStuffy;
    }
}


async function alreadyExists(stuffyName: string, type: string, existing: Array<any>) {
    return (existing.some(entry => (entry.name == stuffyName && entry.animal_type == type)))
}

async function isInvalid(req: any) {

    const errors = validationResult(req)

    if (errors.isEmpty()) {
         return false;
    }
    else {
         return true;
    }
}


async function keepStuffyofTheDayUpdate(id: number, owner: string) {
    if (owner !== "Steven" && owner !== "Monica") {
          return;
    }
    else {
          console.log("adjustment needed")
          await keepStuffyofTheDay(id, owner);
    }
}

async function keepStuffyofTheDay(id : number, owner: string) {
    if (owner !== "Steven" && owner !== "Monica") {
         return;
    }
    const stuffies = await new DatabaseController(process.env.DATABASE_URL!).command("SELECT id, name, animal_type FROM stuffies WHERE owner = $1 ORDER BY name, animal_type ASC;", [owner])
    const offset = stuffies!.rows.findIndex((stuffy: any) => (stuffy.id == id));

    console.log(stuffies)
    console.log(offset)
    console.log(owner)


    var today = getCurrentDate()
    var anchor: any = today.minus({ days: offset })
    anchor = anchor.toISODate()
    console.log(anchor)
    await new DatabaseController(process.env.DATABASE_URL!).command("UPDATE anchordates SET date = $1 WHERE person = $2;", [anchor, owner])
}

const publicPath = path.join(path.resolve(), 'build');
app.use(express.static(publicPath));

app.get('/menu', async (req, res) => {
    const menuData: MainData = await menuRetrieve(req)
    res.send(menuData)
})

app.get("/stuffies/:id", async function (req, res) {

     let dbResult = await new DatabaseController(process.env.DATABASE_URL!).command("SELECT * FROM stuffies WHERE id = $1", [req.params.id])
     if (dbResult && dbResult.rowCount > 0) {
          let [selectedStuffy] = dbResult.rows;
          res.send(selectedStuffy)
     }
     else {
          console.log("ERROR: Something went wrong retrieving this stuffy from the db");
     }
})

app.post("/login", [
     body("username").not().isEmpty(),
     body("password").not().isEmpty()
], async (req: any, res: any) => {
     if (await isInvalid(req)) {
          return res.send('Invalid Fields')
     }
     else if (req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
          req.session.canEdit = true
          return res.send('Success')
     }
     else {
          return res.send('Invalid Username or Password')
     }
})

app.delete('/logout', (req: any,res: any) => {
     req.session.canEdit = false;
     res.send();
})

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})