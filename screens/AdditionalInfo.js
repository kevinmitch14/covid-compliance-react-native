import React, { useState } from 'react'
import { Rating } from 'react-native-ratings';
import { View, Text, Pressable, StyleSheet } from 'react-native'

const customImage = require('../images/Subtractll.png')


const AdditionalInfo = ({ currentPlace }) => {
    const [showComment, setShowComment] = useState(false)
    return (
        <View>
            <Pressable style={styles.button} onPress={() => setShowComment(!showComment)}>
                <Text style={styles.buttonText}>More</Text>
            </Pressable>
            {showComment ?
                <View style={{ paddingTop: 20 }}>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>Staff: </Text>
                        <Rating type='custom'
                            ratingImage={customImage}
                            imageSize={30}
                            ratingColor='#35b999'
                            tintColor='#e5e5e5'
                            ratingBackgroundColor='#c8c7c8'
                            startingValue={currentPlace.staffRating / currentPlace.count}
                            readonly />
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>Cleanliness: </Text>
                        <Rating type='custom'
                            ratingImage={customImage}
                            imageSize={30}
                            ratingColor='#35b999'
                            tintColor='#e5e5e5'
                            ratingBackgroundColor='#c8c7c8'
                            startingValue={currentPlace.cleanRating / currentPlace.count}
                            readonly />
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>Adherance: </Text>
                        <Rating type='custom'
                            ratingImage={customImage}
                            imageSize={30}
                            ratingColor='#35b999'
                            tintColor='#e5e5e5'
                            ratingBackgroundColor='#c8c7c8'
                            startingValue={currentPlace.adheranceRating / currentPlace.count}
                            readonly />
                    </View>
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    ratingContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        alignItems: 'center',
        flexDirection: 'row'
    },
    rating: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 16,
        marginHorizontal: 100,
        backgroundColor: '#04363d',
    }
})

export default AdditionalInfo
