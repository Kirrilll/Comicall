import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react/cjs/react.development";
import DeleteButton from "../../../../../delete-button/deleteButton";
import { SearchContex } from "../../../../../searchContex";

const Tag = ({title, id}) => {
    const {removeTag} =  useContext(SearchContex)

    return (
        <View style = {styles.tag} key = {id}>
            <Text style = {styles.text}>{title}</Text>
            <DeleteButton action = {removeTag(id)}></DeleteButton>
        </View>
    )
}

const styles = StyleSheet.create({
    tag:{
        marginRight: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
        backgroundColor: 'rgba(255, 194, 4, 0.25)',
        borderRadius: 15,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 1
    },
    text: {
        fontFamily: 'caveat-regular',
        lineHeight: 23,
        fontSize: 18,
        textAlign: 'center',
        marginRight: 12,
        color: '#363636'
    }
})

export default Tag;