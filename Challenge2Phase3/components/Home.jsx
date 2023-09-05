import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native'
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../queries';


const Home = ({ navigation }) => {

    const { data, loading, error } = useQuery(GET_JOBS);
    const job = data?.getAllJob

    const buttonOnPress = (id) => {
        navigation.navigate('Detail', {
            id
        })
    }

    return (
        <FlatList style={styles.container}
            data={job}
            renderItem={({ item }) =>
                <Card style={styles.card} >
                    <Card.Content >
                        <Text variant="titleLarge">{item.title}</Text>
                        <Text variant="bodyMedium">{item.description}</Text>
                    </Card.Content>
                    <Card.Cover source={{ uri: item.Company.companyLogo }} />
                    <Card.Actions>
                        <Button onPress={() => buttonOnPress(item.id)} style={styles.button}>Detail</Button>
                    </Card.Actions>
                </Card>

            }
            keyExtractor={(item) => item.id}
        >
        </FlatList>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 4,
        padding: 8,
        backgroundColor: '#1d3557'
    },
    button: {
        backgroundColor: '#74ad9c'
    },
    card: {
        backgroundColor: '#798799',
        marginBottom: 15
    },
    content: {
        flex: 1
    }
})

export default Home;