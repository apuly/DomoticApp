import { DrawerContentScrollView } from "@react-navigation/drawer"

export const validators = {
    "URLValidator": (s) => {
        let regex = "http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"
        if (s == "") {
            return false
        } else {
            let r = RegExp(regex)
            return r.test(s)
        }
    }
}