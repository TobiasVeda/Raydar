import React, { FC, useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { FavouriteLocation } from '@/components/FavouriteLocation';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 36;

interface Location { name: string; uv: number; }

const LocationScreen: FC = () => {
    const [locations, setLocations] = useState<Location[]>([
        { name: 'Grimstad Agder', uv: 3 },
        { name: 'Kristiansand',   uv: 2 },
        { name: 'Tanzania',       uv: 10 },
        { name: 'Florida',        uv: 6 },
    ]);
    const swipeableRefs = useRef<Swipeable[]>([]);

    const handleDelete = (i: number) => {
        swipeableRefs.current[i]?.close();
        setLocations(l => l.filter((_, idx) => idx !== i));
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Ionicons
                    name="location-outline"
                    size={40}
                    color="#34C759"
                    style={styles.topIcon}
                />

                {locations.map((loc, idx) => (
                    <Swipeable
                        key={loc.name}
                        ref={ref => { if (ref) swipeableRefs.current[idx] = ref; }}
                        overshootRight={false}
                        // keep the card rounded while swiping
                        containerStyle={styles.swipeContainer}
                        childrenContainerStyle={styles.swipeChildren}

                        renderRightActions={() => (
                            <View style={styles.deleteContainer}>
                                {/*
                  This 200px-wide red view is INSIDE the 100px container
                  and thus clipped—only 100px shows when swiped.
                */}
                                <View style={styles.fullBgInAction} />

                                <TouchableOpacity
                                    style={styles.deleteBtn}
                                    onPress={() => handleDelete(idx)}
                                >
                                    <Text style={styles.deleteText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    >
                        <FavouriteLocation
                            location={loc.name}
                            uv={loc.uv}
                            onPressDots={() => swipeableRefs.current[idx]?.openRight()}
                        />
                    </Swipeable>
                ))}

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                    <Text style={styles.addTxt}>+ Add New</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default LocationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8eb',
    },
    scrollContent: {
        paddingTop: 24,
        paddingHorizontal: 18,
        paddingBottom: 120,
    },
    topIcon: {
        alignSelf: 'center',
        marginBottom: 18,
    },

    // — keep your front card rounded —
    swipeContainer: {
        marginBottom: 18,   // same as FavouriteLocation’s marginBottom
        borderRadius: 20,   // match the card radius
        overflow: 'visible',// allow its corners to stay rounded when sliding
    },
    swipeChildren: {
        borderRadius: 20,   // round the inner view
        overflow: 'hidden', // clip the card content to that radius
    },

    // — the swipe action itself —
    deleteContainer: {
        width: 100,              // how far you can swipe
        marginBottom: 18,        // match card spacing
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',      // clip the 200px bg down to 100px
        position: 'relative',    // so our fullBgInAction absolute positions
    },
    fullBgInAction: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 200,              // your “pretty” width
        backgroundColor: '#FF3B30',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    deleteBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },

    // — add button at bottom —
    addBtn: {
        alignSelf: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#34C759',
        backgroundColor: '#34C759',
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    addTxt: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
});
