import React from 'react';



const scannerScreen = ({navigation}) => {
    return (
        <Button
          title="Go to Jane's profile"
          
        />
      );
    };
    const ProfileScreen = ({ navigation, route }) => {
      return <Text>This is {route.params.name}'s profile</Text>;
    };

export default scannerScreen;