import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
    centered_page : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textview: {
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "5%"
    },
    textdefault: {
        fontSize: 25,
    },
    textInputView: {
        borderWidth: 1, 
        borderColor: "black"
    },
    textinput: {
        fontSize: 20,
        paddingLeft: "1%"
    },
    buttonview: {
        width: "100%",
        padding: "5%"
    },
    listentry: {
        padding: "3%",
        borderWidth: 1, 
        borderColor: "black"
    },
    touchableButton: {
        width: "100%",
        borderColor: "blue",
        borderWidth: 1,
        paddingLeft: "10%",
        paddingRight: "1%"
    },
    horizontal: {
        flexDirection: "row"
    }
})
