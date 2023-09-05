import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native'

import { GET_JOBS_BY_ID } from '../queries';
import { useQuery } from '@apollo/client';

const Detail = ({ route, navigation }) => {
    const { id } = route.params
    const { data, loading, error } = useQuery(GET_JOBS_BY_ID, {
        variables: {
            getJobDetailId: id
        }
    });

    const buttonOnPressHandler = () => {
        navigation.goBack()
    }

    return (
        < Card style={styles.card}>
            <Card.Content>
                <Card.Cover style={styles.image} source={{ uri: data?.getJobDetail?.result?.Company?.companyLogo }} />
                <Text variant="titleLarge">{data?.getJobDetail?.result?.Company?.name}</Text>
                <Text variant="titleLarge">Location: {data?.getJobDetail?.result?.Company?.location}</Text>
            </Card.Content>
            <Card.Content>
                <Text variant="titleLarge">{data?.getJobDetail?.result?.title}</Text>
                <Text variant="bodyMedium">Job Description: {data?.getJobDetail?.result?.description}</Text>
                <Text variant="bodyMedium">Job Type: {data?.getJobDetail?.result?.jobType}</Text>
            </Card.Content>
            <Card.Content>
                <Text variant="titleLarge">Skill Requirements: </Text>
                {data?.getJobDetail?.resultSkill?.map((el) => {
                    return (
                        <View key={el.id}>
                            <Text variant="bodyMedium">Skill Description: {el.name}</Text>
                            <Text variant="bodyMedium">Skill Type: {el.level}</Text>
                        </View>
                    )
                })}
            </Card.Content>
            <Card.Content>
                <Text variant="titleLarge">Published By: {data?.getJobDetail?.result?.User?.email}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={buttonOnPressHandler}>Back</Button>
            </Card.Actions>
        </Card >
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
    },
    image: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    companyContent: {
        padding: 16,
    },
});

export default Detail;