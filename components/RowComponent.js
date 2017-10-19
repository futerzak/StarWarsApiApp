import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

const RowComponent = ({data, params}) => (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
        {params.map((param, i) => (<Text key={i}>{data[param]}</Text>))}
    </View>
)

export default RowComponent;
