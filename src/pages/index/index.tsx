import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "taro-ui/dist/style/components/button.scss"; // 按需引入

import { getData } from "../../client";
import "./index.scss";
import MaoCard from "./mao-card";
import MaoDetail from "./mao-detail";

export default function Index() {
  const [maoList, setMaoList] = useState<any[]>([]);
  const [activeMao, setActiveMao] = useState<any>();

  useEffect(() => {
    console.log("activeMao", activeMao);
  }, [activeMao]);

  useEffect(() => {
    getMaoData();
  }, []);

  const getMaoData = async () => {
    const list: any = await getData(
      "https://www.xiaxiazheng.cn:444/api/getMaoPuList"
    );
    const headListMap = list.map(item =>
      getData(
        `https://www.xiaxiazheng.cn:444/api/getImgListByOtherId?otherId=${item.head_img_id}&username=zyb`
      )
    );
    const headListList = await Promise.all(headListMap);
    list.forEach((item, index) => {
      const headList: any = headListList[index];
      item.headImgList = headList.map(jtem => {
        return `https://www.xiaxiazheng.cn:2345/min-img/${jtem.filename}`;
      });

      item.imgUrl = headListList[index][0]
        ? `https://www.xiaxiazheng.cn:2345/min-img/${headListList[index][0].filename}`
        : "";
    });
    setMaoList(list);
  };

  return (
    <View className='wrapper'>
      {!activeMao && (
        <View>
          {/* <Text onClick={() => getMaoData()}>我用 Hooks</Text> */}
          <MaoCard maoList={maoList} setActiveMao={setActiveMao} />
        </View>
      )}
      {activeMao && (
        <MaoDetail activeMao={activeMao} setActiveMao={setActiveMao} />
      )}
    </View>
  );
}
