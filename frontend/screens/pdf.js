import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text, TextInput } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function App() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  
  const [title, setTitle] = React.useState('');

  
  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: SSTFonts; font-weight: normal;">
        ${title}
      </h1>
      <img
        src="${require('../assets/doc-bg.png')}"
        style="width: 90vw;" />
    </body>
  </html>
  `;

  const print = async () => {
    await Print.printAsync({
      html,
    });
  }
  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({
      html
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }


  const changeTitleHandler = (value) => {
    setTitle(value);
  };
  return (
    <View style={{flex: 2,
      justifyContent: 'center',
      alignItems: 'center',  backgroundColor: 'red'}}>
      <TextInput onChangeText={changeTitleHandler} placeholder="Title" />
      
      <Button title='Print to PDF file' onPress={printToFile}/>
    
    <Button title='Print' onPress={print}  />
      <View />

     
    </View>
  );
}