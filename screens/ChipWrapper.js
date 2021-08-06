import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import SingleChip from '../screens/SingleChip'

const ChipWrapper = () => {

    return (
        <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <SingleChip title={"Nearby"} />
                <SingleChip title={"Most Reviewed"} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <SingleChip title={"Restaurants"} />
                <SingleChip title={"Bars"} />
                <SingleChip title={"Landmarks"} />
                <SingleChip title={"Hotels"} />
                <SingleChip title={"Retail"} />
            </View>
        </>
    )
}

export default ChipWrapper

const styles = StyleSheet.create({
    buttonSingle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 10,
        borderColor: '#fff',
        borderWidth: 1,
        flex: 1,
        paddingVertical: 6,
        marginHorizontal: 2
    },

    text: {
        fontSize: 12,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})
