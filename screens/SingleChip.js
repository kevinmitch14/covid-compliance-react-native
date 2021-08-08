import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { onRemove, onSelect } from '../slices/chipSlice';
import { useDispatch, useSelector } from 'react-redux';

const SingleChip = ({ title }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.chip)
    const [active, setActive] = useState(false)

    const conditionalButton =

        active ?
            <Pressable
                onPress={() => { setActive(false); dispatch(onRemove(title)) }}
                style={styles.buttonActive}
            >
                <Text style={styles.text}>{title}</Text>
            </Pressable >
            :
            <Pressable
                onPress={() => { setActive(true); dispatch(onSelect(title)) }}
                style={styles.buttonInactive}
            >
                <Text style={styles.text}>{title}</Text>
            </Pressable >
    return (
        conditionalButton
    )
}

export default SingleChip

const styles = StyleSheet.create({
    buttonInactive: {
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
    buttonActive: {
        backgroundColor: '#35b999',
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
        fontSize: 11,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})
