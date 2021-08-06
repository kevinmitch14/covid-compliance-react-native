import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, Pressable } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import RatingWindow from './RatingWindow.js'
import db from '../firebase.js'
import firebase from 'firebase/app'
import ChipWrapper from './ChipWrapper.js'


const HomeScreen = () => {

    const [showInput, setShowInput] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [placeDetails, setPlaceDetails] = useState(null)
    const [staffRating, setStaffRating] = useState(0)
    const [cleanRating, setCleanRating] = useState(0)
    const [adheranceRating, setAdheranceRating] = useState(0)
    const [county, setCounty] = useState(null)


    useEffect(() => {
        placeDetails && placeDetails.address_components.forEach((addressComponent) => {
            if (addressComponent.types.includes("administrative_area_level_1")) {
                console.log(addressComponent.long_name)
                setCounty(addressComponent.long_name)
            } else {
                if (addressComponent.types.includes("administrative_area_level_2")) {
                    console.log(addressComponent.long_name)
                    setCounty(addressComponent.long_name)
                }
            }
        })
    }, [placeDetails])

    const staffRatingHandler = (rating) => {
        setStaffRating(rating)
    }
    const cleanRatingHandler = (rating) => {
        setCleanRating(rating)
    }
    const adheranceRatingHandler = (rating) => {
        setAdheranceRating(rating)
    }

    const onUpload = async () => {
        if (placeDetails) {
            const reviewsRef = db.collection('reviews')
            const snap = await reviewsRef.where('place', '==', placeDetails.name.toUpperCase()).get()
            if (!snap.empty) {
                snap.forEach(doc => {
                    db.collection('reviews').doc(doc.id).update({
                        cleanRating: (parseInt(doc.data().cleanRating) + parseInt(cleanRating)),
                        adheranceRating: parseInt(doc.data().adheranceRating) + parseInt(adheranceRating),
                        staffRating: parseInt(doc.data().staffRating) + parseInt(staffRating),
                        average: ((((doc.data().accumRating) / 3) + ((parseInt(cleanRating) + parseInt(adheranceRating) + parseInt(staffRating)) / 3)) / parseInt(doc.data().count + 1)),
                        accumRating: parseInt(doc.data().accumRating) + ((parseInt(cleanRating) + parseInt(adheranceRating) + parseInt(staffRating))),
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        count: parseInt(doc.data().count + 1)
                    })
                })
                setPlaceDetails(null)
                setShowInput(false)
                return;
            }

            if (placeDetails.name !== "" && cleanRating !== 0 && adheranceRating !== 0 && staffRating !== 0) {
                db.collection('reviews').add({
                    place: placeDetails.name.toUpperCase(),
                    cleanRating: parseInt(cleanRating),
                    adheranceRating: parseInt(adheranceRating),
                    staffRating: parseInt(staffRating),
                    accumRating: ((parseInt(cleanRating) + parseInt(adheranceRating) + parseInt(staffRating))),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    extraData: placeDetails,
                    count: 1,
                    county: county,
                    average: ((parseInt(cleanRating) + parseInt(staffRating) + parseInt(adheranceRating)) / 3)
                })
            }
        }
        setPlaceDetails(null)
        setShowInput(false)
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    {showInput === true ?
                        <>
                            <GooglePlacesAutocomplete nearbyPlacesAPI="GooglePlacesSearch"
                                debounce={400}
                                fetchDetails={true}
                                placeholder="Enter a cafe, bar, restaurant etc."
                                styles={{
                                    container: {
                                        flex: 0,
                                        paddingHorizontal: 20,
                                    }, textInput: {
                                        fontSize: 18
                                    }
                                }}
                                onPress={(data, details = null) => {
                                    setPlaceDetails(details)
                                }}

                                query={{
                                    key: 'AIzaSyBhcUiOcSbio-KNInHy-n3sUoCFtjMyL1c',
                                    // components: 'country:irl'
                                }}

                            ></GooglePlacesAutocomplete>


                            {placeDetails &&
                                <RatingWindow
                                    staffRatingHandler={staffRatingHandler}
                                    adheranceRatingHandler={adheranceRatingHandler}
                                    cleanRatingHandler={cleanRatingHandler}
                                />
                            }


                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 12, paddingHorizontal: 40 }}>
                                <Pressable style={styles.button} onPress={() => onUpload()}>
                                    <Text style={styles.text}>Submit</Text>
                                </Pressable>
                                <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => { setShowInput(false); setPlaceDetails(null) }}>
                                    <Text style={styles.text}>Cancel</Text>
                                </Pressable>
                            </View>

                        </>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Pressable style={styles.buttonSingle} onPress={() => setShowInput(true)}>
                                <Text style={styles.text}>Write a review</Text>
                            </Pressable>
                            <Pressable style={styles.buttonFilter} onPress={() => setShowFilter(!showFilter)}>
                                <Text style={styles.text}>Filter</Text>
                            </Pressable>
                        </View>
                    }

                    {showFilter === true ? <ChipWrapper /> : null}

                </View>
            </SafeAreaView >
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 15,
        backgroundColor: "white",
        width: 250
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#35b999',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },

    buttonSingle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#35b999',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20
    },
    buttonFilter: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 20,
        paddingVertical: 9,
        paddingHorizontal: 10,
        // backgroundColor: '#35b999',
        borderColor: '#fff',
        borderWidth: 1,
    },

    buttonCancel: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1
    },


    text: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    container: {
        backgroundColor: '#04363d',
        paddingTop: 10,
        // marginBottom: 10
    }

})

export default HomeScreen
