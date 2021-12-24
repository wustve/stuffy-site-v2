import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
export default function getLink(stuffy: StuffyMenuData) {
    return ('/' + stuffy.id.toString());
}