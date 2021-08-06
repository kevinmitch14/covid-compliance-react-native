import React, { useEffect, useState } from 'react'
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native'
import db from '../firebase.js'
import { Rating } from 'react-native-ratings';
import AdditionalInfo from './AdditionalInfo.js';
const customImage = require('../images/Subtractll.png')

const Results = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        db.collection('reviews').orderBy('average', 'desc').onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc => doc.data()))
        })
    }, []);

    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <View style={styles.container}>
                        <View style={styles.upperRow}>
                            <Text style={item.place.length > 20 ? styles.longName : styles.shortName}>{item.place}</Text>
                            <Text style={styles.bottomText}>{(item.count)} {item.count === 1 ? "Review" : "Reviews"}</Text>
                        </View>

                        <View style={styles.bottomRow}>
                            <Rating type='custom'
                                ratingImage={customImage}
                                imageSize={35}
                                ratingColor='#35b999'
                                tintColor='#e5e5e5'
                                ratingBackgroundColor='#c8c7c8'
                                startingValue={item.average}
                                readonly />
                            <Text style={styles.bottomText}>{(item.average).toFixed(1)}</Text>
                            {/* <Text style={styles.bottomText}>{(item.count)} {item.count === 1 ? "Review" : "Reviews"}</Text> */}
                        </View>

                        <AdditionalInfo
                            currentPlace={item}>
                        </AdditionalInfo>

                    </View>
                }
                keyExtractor={(item) => item.place}
            >

            </FlatList>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        borderColor: '#c4c4c4',
        borderWidth: 1,
        borderRadius: 4,
        margin: 10,
        marginHorizontal: 15,
        padding: 20,
    },

    upperRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 60,
        alignItems: 'center',
        paddingTop: 10
    },

    buttonText: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    longName: {
        fontSize: 14,
    },
    shortName: {
        fontSize: 20,
    },

    bottomText: {
        fontSize: 18
    },


    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#35b999',
    },
})

export default Results
