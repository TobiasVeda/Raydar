import React, { FC, useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/***********************************
 * LOCATION SCREEN – icon on top   *
 ***********************************/

interface LocationCardProps {
    name: string;
    uv: number; // 0 – 11+
}

const LocationCard: FC<LocationCardProps> = ({ name, uv }) => {
    const category = useMemo(() => {
        if (uv <= 2) return 'Low';
        if (uv <= 5) return 'Moderate';
        if (uv <= 7) return 'High';
        if (uv <= 10) return 'Very High';
        return 'Extreme';
    }, [uv]);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{name}</Text>

            <View style={styles.cardBody}>
                {/* --- Gauge placeholder – swap with your SVG later --- */}
                <View style={styles.gaugePlaceholder} />

                <View style={styles.valueBlock}>
                    <Text style={styles.uvNumber}>{uv}</Text>
                    <Text style={styles.uvLabel}>{category}</Text>
                </View>
            </View>
        </View>
    );
};

const LocationScreen: FC = () => {
    // Dummy data – replace with live values
    const locations = [
        { name: 'My Location', uv: 2 },
        { name: 'LA', uv: 5 },
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Top location icon – matches nav bar glyph */}
                <Ionicons
                    name="location-outline"
                    size={40}
                    color="#34C759" /* same green as active location tab */
                    style={styles.topIcon}
                />

                {locations.map((l) => (
                    <LocationCard key={l.name} name={l.name} uv={l.uv} />
                ))}

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                    <Text style={styles.addTxt}>+ Add New</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default LocationScreen;

/***************
 * STYLESHEET *
 **************/
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF6', // very light beige
    },
    scrollContent: {
        paddingTop: 24,
        paddingHorizontal: 18,
        paddingBottom: 120, // room for nav bar
    },
    /* --- top icon --- */
    topIcon: {
        alignSelf: 'center',
        marginBottom: 18,
    },
    /* --- placeholders --- */
    gaugePlaceholder: {
        width: 120,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#EDEDED',
    },
    /* --- cards --- */
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    cardBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
    },
    valueBlock: {
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    uvNumber: {
        fontSize: 56,
        fontWeight: '700',
        lineHeight: 56,
    },
    uvLabel: {
        fontSize: 20,
        fontWeight: '600',
    },
    /* --- + Add New --- */
    addBtn: {
        alignSelf: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 6,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    addTxt: {
        fontSize: 20,
        fontWeight: '600',
    },
});
