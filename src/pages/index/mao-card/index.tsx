import React, { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "taro-ui/dist/style/components/button.scss"; // 按需引入

import "./index.scss";

export default function MaoCard(props) {
  const { maoList, setActiveMao } = props;

  return (
    <View className='mao-card-list'>
      {maoList.map(item => {
        return (
          <View
            className='card-wrap'
            key={item.mao_id}
            onClick={() => setActiveMao(item)}
          >
            <Image className='card-img' src={item.imgUrl} />
            <Text className='mao-data'>
              <Text className='data-item'>姓名：{item.name}</Text>
              <Text className='data-item'>出生：{item.birthday}</Text>
              <Text className='data-item'>特点：{item.feature}</Text>
              <Text className='data-item'>描述：{item.description}</Text>
            </Text>
          </View>
        );
      })}
    </View>
  );
}
