import React, { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "taro-ui/dist/style/components/button.scss"; // 按需引入

import { getData } from "../../../client";
import "./index.scss";

export default function MaoDetail(props) {
  const { activeMao } = props;
  const [allImgList, setAllImgList] = useState<any[]>([]);

  useEffect(() => {
    getMaoData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMaoData = async () => {
    let list: any = await getData(
      `https://www.xiaxiazheng.cn:444/api/getImgListByOtherId?otherId=${activeMao.mao_id}&username=zyb`
    );
    console.log('list', list);
    if (list) {
      list = list.map(item => {
        return `https://www.xiaxiazheng.cn:2345/min-img/${item.filename}`;
      });
      setAllImgList(list);
    }
  };

  return (
    <>
      <View>
        {activeMao.headImgList.map(item => (
          <Image key={item} src={item} />
        ))}
      </View>
      <View>
        <Text>{activeMao.name}</Text>
        <Text>{activeMao.father}</Text>
        <Text>{activeMao.mother}</Text>
        {/* <Text>{activeMao.appearance}</Text> */}
        <Text>{activeMao.birthday}</Text>
        <Text>{activeMao.feature}</Text>
        <Text>{activeMao.description}</Text>
      </View>
      <View>
        <Text>{activeMao.name}的相册</Text>
        {allImgList.map(item => (
          <Image key={item} src={item} />
        ))}
      </View>
    </>
  );
}
