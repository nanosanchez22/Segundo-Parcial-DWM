import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addDestination, updateDestination } from '../utils/api';


const AgregarDestino = ({ navigation, route }) => {
    const [name, setName] = useState(route.params?.destination?.name || '');
    const [description, setDescription] = useState(route.params?.destination?.description || '');
    const [difficulty, setDifficulty] = useState(route.params?.destination?.difficulty || 'Fácil');
    const [onSave, setOnSave] = useState(() => () => {});



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const saveCallback = route.params?.onSave;
            if (saveCallback) {
                setOnSave(() => saveCallback);
            }
        });

        return unsubscribe;
    }, [navigation, route.params]);


    const handleSave = async () => {
        const newDestination = {
            id: route.params?.destination?.id || Date.now(),
            name,
            description,
            difficulty,
            favorites: route.params?.destination?.favorites || 0,
        };
    
        try {
            if (route.params?.destination) {
                await updateDestination(newDestination);
            } else {
                await addDestination(newDestination);
            }
    
            navigation.getParent()?.getState()?.routes?.forEach((r) => {
                if (r.name === 'ListaDeDestinos') {
                    const onSave = r.options?.onSave;
                    if (onSave) onSave(newDestination);
                }
            });
    
            navigation.goBack();
        } catch (error) {
            console.error("Error al guardar el destino:", error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre del destino:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Descripción breve:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.label}>Nivel de dificultad:</Text>
            <Picker
                selectedValue={difficulty}
                style={styles.input}
                onValueChange={(itemValue) => setDifficulty(itemValue)}
            >
                <Picker.Item label="Fácil" value="Fácil" />
                <Picker.Item label="Moderada" value="Moderada" />
                <Picker.Item label="Difícil" value="Difícil" />
            </Picker>
            <Button title="Guardar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
});

export default AgregarDestino;