import {View, StyleSheet, FlatList} from "react-native";
import {RadioButton, Text} from 'react-native-paper';
import React, {useEffect, useState} from "react";
import {userTYpe} from "@/app/Utils/utils";

const DATA: {
    "name": string,
    "type": number
}[] = [
    {
        "name": "Karan Ahuja",
        "type": 1
    },
    {
        "name": "Suraj Singh",
        "type": 0
    },
    {
        "name": "Priyanka Arora",
        "type": 1
    },
    {
        "name": "Harsh Vij",
        "type": 0
    },
    {
        "name": "Akash Chopra",
        "type": 1
    },
    {
        "name": "Ankita Pal",
        "type": 0
    },
    {
        "name": "Amandeep Pooni",
        "type": 1
    }
];

function CustomerScreen() {
    const [selectedUserType, setSelectedUserType] = useState<string>(userTYpe.ADMIN);
    const [isLoading, setLoading] = useState<boolean>(false);

    return (
        <View style={style.container}>
            <Text style={style.title}>User Type</Text>
            <View style={style.radiogroup}>
                <RadioButton.Group
                    onValueChange={newValue => setSelectedUserType(newValue)} value={selectedUserType}>
                    <View style={style.radioButton}>
                        <RadioButton.Android value={userTYpe.ADMIN}/>
                        <Text>Admin</Text>
                    </View>
                    <View style={style.radioButton}>
                        <RadioButton.Android value={userTYpe.MANAGER}/>
                        <Text>Manager</Text>
                    </View>
                </RadioButton.Group>
            </View>
            <View style={style.devider}/>
            <View style={style.userlistContainer}>
                <Text style={style.title}>{selectedUserType == "0" ? "Admin" : "Manager"} Users</Text>
                <FlatList
                    refreshing={isLoading}
                    onRefresh={() => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                        }, 3000)
                    }}
                    data={DATA.filter((d) => {
                        return d.type.toString() == selectedUserType
                    })}
                    renderItem={({item}) => <Item item={item}/>}
                    keyExtractor={item => item.name}
                />
            </View>
        </View>
    );
}

const Item = ({item}) => (
    <View style={style.rowitem}>
        <View style={style.rowItemHeader}>
            <Text style={style.itemHeader}>{item.name[0]}</Text>
        </View>
        <View>
            <Text style={style.rowItemTitle}>{item.name}</Text>
            <Text style={style.rowItemSubTitle}>{item.type == 0 ? "Admin" : "Manager"}</Text>
        </View>
    </View>
);

const style = StyleSheet.create(
    {
        rowItemTitle: {
            fontSize: 18,
            fontWeight: 'bold'
        },
        rowitem: {
            flex: 1,
            flexDirection: 'row',
            marginVertical: 5

        },
        container: {
            flex: 1,
            padding: 25,
            backgroundColor: 'white'
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 15
        },
        radioButton: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center'
        },
        radiogroup: {
            marginTop: 1
        },
        userlistContainer: {
            marginTop: 15,
            flex: 1
        },
        devider: {
            height: 1,
            backgroundColor: '#e7ebee',
            marginVertical: 5
        },
        itemHeader: {
            color: '#2932e8',
            fontWeight: 'bold'
        },
        rowItemHeader: {
            backgroundColor: '#cfd9ee',
            padding: 15,
            borderRadius: 5,
            marginRight: 10
        },
        rowItemSubTitle: {
            fontSize: 14,
        },
    }
);
export default CustomerScreen;
