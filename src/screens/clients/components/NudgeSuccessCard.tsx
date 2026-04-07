import React, { type ReactElement } from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './NudgeSuccessCard.styles';
import { type NudgeSuccessCardProps } from './NudgeSuccessCard.types';

export const NudgeSuccessCard = ({
  clientName,
  messages,
}: NudgeSuccessCardProps): ReactElement => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://avatar.iran.liara.run/public/64' }}
          style={styles.avatar}
        />
        <View style={styles.headerContent}>
          <Text style={styles.name}>{clientName}</Text>
          <Text style={styles.status}>Sent just now</Text>
        </View>
      </View>

      <View style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageBox}>
            <Text style={styles.quote}>"</Text>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
