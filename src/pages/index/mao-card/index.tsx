import React, { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "taro-ui/dist/style/components/button.scss"; // 按需引入

import "./index.scss";

export default function MaoCard(props) {
  const { maoList, setActiveMao } = props;

  return (
    <View>
      {maoList.map(item => {
        return (
          <View
            className='cardWrap'
            key={item.mao_id}
            onClick={() => setActiveMao(item)}
          >
            <Image src={item.imgUrl} />
            <Text>{item.name}</Text>
            <Text>{item.birthday}</Text>
            <Text>{item.feature}</Text>
            <Text>{item.description}</Text>
          </View>
        );
      })}
    </View>
  );
}
