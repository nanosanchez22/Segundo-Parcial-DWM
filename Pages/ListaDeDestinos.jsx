import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import { getDestinations, deleteDestination, getDestination } from '../utils/api';

const ListaDeDestinos = ({ navigation }) => {
    const [destinations, setDestinations] = useState([]);

    const fetchData = async () => {
        try {
            const data = await getDestinations();
            const sortedData = data.sort((a, b) => b.favorites - a.favorites);
            setDestinations(sortedData);
        } catch (error) {
            console.error('Error al cargar los destinos:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [destinations]);

    const handleSave = (newDestination) => {
        setDestinations((prevDestinations) => {
            const index = prevDestinations.findIndex(dest => dest.id === newDestination.id);
            if (index > -1) {
                const updatedDestinations = [...prevDestinations];
                updatedDestinations[index] = newDestination;
                return updatedDestinations;
            } else {
                return [newDestination, ...prevDestinations];
            }
        });
    };
   
  
    
    const handleDelete = async (id) => {
        try {
            console.log("id!!!",id);
    
            const success = await deleteDestination(id)
            console.log("success", success);
            if (success.ok) {
                setDestinations((prevDestinations) =>
                    prevDestinations.filter((dest) => dest.id !== id)
                );
            } else {
                console.error('No se pudo eliminar el destino en la API.');
            }
        } catch (error) {
            console.error('Error al eliminar el destino:', error);
        }
    };
    
    
    const navigateTo = (destination) => {
        /* navigation.navigate('Agregar Destino', { destination, onSave: handleSave });
        //navigation.setOptions({ onSave: handleSave }); */
        navigation.navigate('Agregar Destino', { destination });
        navigation.setOptions({
            onSave: handleSave,
        });

    };


    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigateTo(item)}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>{item.description}</Text>
                <View style={[styles.tag, getDifficultyStyle(item.difficulty)]}>
                    <Text style={styles.tagText}>Dificultad: {item.difficulty}</Text>
                </View>
                <Text>Favoritos: {item.favorites}</Text>
            </TouchableOpacity>
            <Button style={styles.deleteButton} title="Eliminar" onPress={() => handleDelete(item.id)} />
        </View>
    );

    const getDifficultyStyle = (difficulty) => {
        switch (difficulty) {
            case 'Fácil':
                return styles.easy;
            case 'Moderada':
                return styles.medium;
            case 'Difícil':
                return styles.hard;
            default:
                return styles.default;
        }
    };

    return (
        <View style={styles.container}>
            <Button style={styles.button} title="Agregar Destino" onPress={() => navigateTo()} />
            <FlatList
                data={destinations}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tag: {
        paddingVertical: 2,
        //padding: 5,
    },
    tagText: {
        //color: '#fff',
        fontWeight: 'bold',        
    },
    easy: {
        backgroundColor: 'lightgreen',
    },
    medium: {
        backgroundColor: 'yellow',
    },
    hard: {
        backgroundColor: 'violet',
    },
    default: {
        backgroundColor: 'white',
    },
    button: {
        padding: 10,
        marginBottom: 20,
    },
    deleteButton: {
        padding: 10,
        margin: 10,
        
    },
    
});

export default ListaDeDestinos;
