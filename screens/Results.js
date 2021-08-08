import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import db from "../firebase.js";
import { v4 as uuid } from 'uuid';

import { Rating } from "react-native-ratings";
import AdditionalInfo from "./AdditionalInfo.js";
const customImage = require("../images/Subtractll.png");

import { useSelector } from "react-redux";

const Results = () => {
    const [data, setData] = useState([]);
    const state = useSelector((state) => state.chip);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [resultPlaces, setResultPlaces] = useState([])

    console.log({ resultPlaces });

    useEffect(() => {
        db.collection("reviews")
            .orderBy("average", "desc")
            .onSnapshot((snapshot) => {
                setData(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);

    const dict = {
        Restaurants: ["restaurant", "food"],
        Hotels: "lodging",
        Landmarks: "tourist_attraction",
        "Most Reviewed": "reviewed",
        Bars: "bar",
        Retail: ["furniture_store", "department_store", "supermarket"],
        Nearby: "nearby",
    };

    const chipFilter = useRef(() => { });
    chipFilter.current = () => {
        state.activeCats.forEach((item) => {
            let placeType = dict[item];
            let filteredPlaces = data.filter(
                (item) =>
                    placeType.includes(item.extraData.types[0]) ||
                    placeType.includes(item.extraData.types[1])
            );
            setFilteredPlaces((prevState) => [...prevState, ...filteredPlaces]);
        });
    };

    useEffect(() => {
        chipFilter.current();
        return () => {
            setFilteredPlaces([]);
        };
    }, [state.activeCats]);

    let resultsList = [...data];

    if (state.activeCats.length === 0) {
        console.log("No filters");
        resultsList = data;
    }
    else if (state.activeCats.includes("Most Reviewed") && filteredPlaces.length > 0) {
        console.log("Most Reviewed and filtered more than 0");
        resultsList = [];
        resultsList = filteredPlaces.sort((a, b) => (a.count < b.count ? 1 : -1));
    } else if (state.activeCats.includes("Most Reviewed")) {
        console.log("Just Most Reviewed");
        resultsList = [];
        resultsList = data.sort((a, b) => (a.count < b.count ? 1 : -1));
    } else {
        console.log("Filtered");
        resultsList = [];

        resultsList = filteredPlaces.sort((a, b) => a.average < b.average ? 1 : -1);
    }


    return (
        <>
            <FlatList
                data={[... new Set(resultsList)]}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.upperRow}>
                            <Text
                                style={
                                    item.place.length > 20 ? styles.longName : styles.shortName
                                }
                            >
                                {item.place}
                            </Text>
                            <Text style={styles.bottomText}>
                                {item.count} {item.count === 1 ? "Review" : "Reviews"}
                            </Text>
                        </View>

                        <View style={styles.bottomRow}>
                            <Rating
                                type="custom"
                                ratingImage={customImage}
                                imageSize={35}
                                ratingColor="#35b999"
                                tintColor="#e5e5e5"
                                ratingBackgroundColor="#c8c7c8"
                                startingValue={item.average}
                                readonly
                            />
                            <Text style={styles.bottomText}>{item.average.toFixed(1)}</Text>
                        </View>

                        <AdditionalInfo currentPlace={item}></AdditionalInfo>
                    </View>
                )}
                keyExtractor={(item) => uuid()}
            ></FlatList>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e5e5e5",
        borderColor: "#c4c4c4",
        borderWidth: 1,
        borderRadius: 4,
        margin: 10,
        marginHorizontal: 15,
        padding: 20,
    },

    upperRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 60,
        alignItems: "center",
        paddingTop: 10,
    },

    buttonText: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },

    longName: {
        fontSize: 14,
    },
    shortName: {
        fontSize: 20,
    },

    bottomText: {
        fontSize: 18,
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#35b999",
    },
});

export default Results;
