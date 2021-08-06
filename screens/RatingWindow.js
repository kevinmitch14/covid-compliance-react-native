import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings'

const RatingWindow = ({ staffRatingHandler, cleanRatingHandler, adheranceRatingHandler }) => {

    const customImage = require('../images/Subtractll.png')

    return (
        <View style={{ paddingVertical: 10 }}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>Cleanliness: </Text>
                <Rating type='custom'
                    ratingImage={customImage}
                    imageSize={35}
                    ratingColor='#35b999'
                    tintColor='#04363d'
                    ratingBackgroundColor='#c8c7c8'
                    startingValue={0}
                    onFinishRating={(rating) => cleanRatingHandler(rating)}
                />
            </View>

            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>Adherance: </Text>
                <Rating type='custom'
                    ratingImage={customImage}
                    imageSize={35}
                    ratingColor='#35b999'
                    tintColor='#04363d'
                    ratingBackgroundColor='#c8c7c8'
                    startingValue={0}
                    onFinishRating={(rating) => adheranceRatingHandler(rating)}
                />
            </View>

            <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>Staff: </Text>
                <Rating type='custom'
                    ratingImage={customImage}
                    imageSize={35}
                    ratingColor='#35b999'
                    tintColor='#04363d'
                    ratingBackgroundColor='#c8c7c8'
                    startingValue={0}
                    // onFinishRating={(rating) => setStaffRating(rating)}
                    onFinishRating={(rating) => staffRatingHandler(rating)}

                />
            </View>
        </View>
    )
}

export default RatingWindow

const styles = StyleSheet.create({
    ratingContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    ratingText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20
    }
})
