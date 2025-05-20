import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
} from 'react-native';
import { getCoordinatesFromName } from '@/services/geocode';

interface CoordinateResult {
    name: string;
    lat: number;
    lon: number;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    onSearch: (lat: number, lon: number) => void;
}

export const AddLocationOverlay: React.FC<Props> = ({ visible, onClose, onSearch }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CoordinateResult[]>([]);

    const handleSearch = async () => {

        const coords = await getCoordinatesFromName(query);

        if (coords && coords.length > 0) {
            const parsed = coords
                .map((c: any) => ({
                    name: c.display_name || c.name || `${c.lat}, ${c.lon}`,
                    lat: typeof c.lat === 'string' ? parseFloat(c.lat) : c.lat,
                    lon: typeof c.lon === 'string' ? parseFloat(c.lon) : c.lon,
                    importance: c.importance || 0,
                    country_code: c.address?.country_code || '',
                }))
                .filter(c => !isNaN(c.lat) && !isNaN(c.lon))
                .sort((a, b) => b.importance - a.importance)
                .slice(0, 4);

            setResults(parsed);
        }
    };

    const handleSelect = (lat: number, lon: number) => {
        console.log('Final location selected:', { lat, lon });
        setQuery('');
        setResults([]);
        onSearch(lat, lon);
    };

    const handleClose = () => {
        setQuery('');
        setResults([]);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add a Location</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter city or place"
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={handleClose} style={styles.backButton}>
                            <Text style={styles.buttonText}>Go Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
                    </View>

                    {results.length > 0 && (
                        <View style={{ maxHeight: 200 }}>
                            <FlatList
                                keyboardShouldPersistTaps="handled"
                                data={results}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.resultItem}
                                        onPress={() => {

                                            handleSelect(item.lat, item.lon);
                                        }}
                                    >
                                        <Text style={styles.resultText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        maxHeight: '80%',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 10,
        marginRight: 8,
        alignItems: 'center',
    },
    searchButton: {
        flex: 1,
        backgroundColor: '#34C759',
        padding: 12,
        borderRadius: 10,
        marginLeft: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    resultItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    resultText: {
        fontSize: 16,
        color: '#333',
    },
});
