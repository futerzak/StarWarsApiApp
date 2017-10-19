import React, { Component } from 'react';
import {
    ListView,
    Text,
    View,
    Button,
    TextInput,
} from 'react-native';

import RowComponent from './RowComponent.js';

const StarWarsDataComponent = ({state, setPage, prevUrl, nextUrl}) => {
    return (<View>
        <Text>Page: {state.page}/{state.pageNumber}</Text>
        <ListView
            dataSource={state.dataSource}
            renderRow={(rowData) => (
                <RowComponent
                    data={rowData}
                    params={['name','mass', 'height', 'birth_year']}
                />
            )}
            />
        <TextInput
            style={{height:40}}
            placeholder="Wpisz numer strony"
            onChangeText={page => {setPage(parseInt(page))}}
        />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                    onPress={prevUrl}
                    title="Previous"
                    />
                <Button
                    onPress={nextUrl}
                    title="Next"
                    />
            </View>
    </View>)
}

export default StarWarsDataComponent;
