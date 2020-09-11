import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { AtButton, AtModal, AtModalContent } from 'taro-ui';
import 'taro-ui/dist/style/components/modal.scss'; // 按需引入
// @import "~taro-ui/dist/style/components/modal.scss";

import { getData } from '../../../client';
import './index.scss';

export default function MaoDetail(props) {
  const { activeMao, setActiveMao } = props;
  const [allImgList, setAllImgList] = useState<any[]>([]);
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [activeImg, setActiveImg] = useState<string>('')

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
    <View className='mao-detail'>
      <View className='backto' onClick={() => setActiveMao(undefined)}>
        返回上层
      </View>
      <View className='head-img'>
        {activeMao.headImgList.map(item => (
          <Image className='head-img-item' key={item} src={item} />
        ))}
      </View>
      <View className='mao-detail-data'>
        <Text className='data-item'>姓名：{activeMao.name}</Text>
        <Text className='data-item'>父亲：{activeMao.father}</Text>
        <Text className='data-item'>母亲：{activeMao.mother}</Text>
        {/* <Text className='data-item'>{activeMao.appearance}</Text> */}
        <Text className='data-item'>生日：{activeMao.birthday}</Text>
        <Text className='data-item'>特点：{activeMao.feature}</Text>
        <Text className='data-item'>描述：{activeMao.description}</Text>
      </View>
      <View className='photo-gallery'>
        <Text className='gallery-title'>
          {activeMao.name}的相册(共{allImgList.length}张照片)
        </Text>
        <View className='imgBox'>
          {allImgList.map(item => (
            <View key={item}
              className='imgWrap'
              onClick={() => {
                setActiveImg(item)
                setIsOpened(true)
              }}
            >
              <Image className='gallery-img' src={item} />
            </View>
          ))}          
        </View>
      </View>
      <AtModal isOpened={isOpened} onClose={() => {
          setActiveImg('')
          setIsOpened(false)
        }}
      >
      <AtModalContent>
        {activeImg !== '' && <Image className='modal-img' src={activeImg} />}
      </AtModalContent>
      </AtModal>
    </View>
  );
}
