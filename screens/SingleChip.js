import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'


const SingleChip = (props) => {

    const [active, setActive] = useState(false)

    return (
        <Pressable
            style={active ? styles.buttonActive : styles.buttonInactive}
            onPress={() => { setActive(!active); props.clickHandler }}>
            <Text style={styles.text}>{props.title}</Text>
        </Pressable >
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
        fontSize: 12,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})
