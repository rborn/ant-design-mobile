import React from 'react';
import { Image, Text, Dimensions, View } from 'react-native';
import Flex from '../flex';
import Carousel from '../carousel';
import GridStyle from './style';
import { DataItem, GridProps } from './PropsType';

export default class Grid extends React.Component<GridProps, any> {
  static defaultProps = {
    data: [],
    hasLine: true,
    isCarousel: false,
    columnNum: 4,
    carouselMaxRow: 2,
    styles: GridStyle,
  };

  getFlexItemStyle() {
    return {
      height: Dimensions.get('window').width / 4,
      borderRightWidth: this.props.hasLine ? 1 : 0,
    };
  }

  render() {
    const { data, hasLine, columnNum, isCarousel, carouselMaxRow, onClick = () => {}, styles } = this.props;

    const dataLength = data && data.length || 0;
    const rowCount = Math.ceil(dataLength / columnNum);

    const renderItem = this.props.renderItem || ((dataItem: DataItem) => (
      <Flex direction="column" justify="center" style={{ flex: 1 }}>
        <Image source={{ uri: dataItem.icon }} style={styles.icon} />
        <Text style={styles.text}>{dataItem.text}</Text>
      </Flex>
    ));

    const flexItemStyle = this.getFlexItemStyle();
    const rowsArr: any[] = [];

    for (let i = 0; i < rowCount; i++) {
      const rowArr: any[] = [];
      for (let j = 0; j < columnNum; j++) {
        const dataIndex = i * columnNum + j;
        if (dataIndex < dataLength) {
          const el = data && data[dataIndex];
          rowArr.push(
            <Flex.Item key={j} style={[styles.grayBorderBox, flexItemStyle, {
              borderLeftWidth: hasLine && j === 0 ? 1 : 0,
            }]}
              onPress={() => onClick(el, dataIndex)}
            >
              {renderItem(el, dataIndex)}
            </Flex.Item>
          );
        } else {
          rowArr.push(
            <Flex.Item key={j} style={[styles.grayBorderBox, flexItemStyle]} />
          );
        }
      }
      rowsArr.push(
        <Flex key={i} style={[styles.grayBorderBox, {
          borderTopWidth: hasLine && i === 0 ? 1 : 0,
          borderBottomWidth: hasLine ? 1 : 0,
        }]}>
          {rowArr}
        </Flex>
      );
    }

    const pageCount = Math.ceil(rowCount / carouselMaxRow);
    const pagesArr: any[] = [];
    if (isCarousel && pageCount > 1) {
      for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        const pageRows: any[] = [];
        for (let ii = 0; ii < carouselMaxRow; ii++) {
          const rowIndex = pageIndex * carouselMaxRow + ii;
          if (rowIndex < rowCount) {
            pageRows.push(rowsArr[rowIndex]);
          } else {
            const res: any = [];
            for (let jjj = 0; jjj < columnNum; jjj++) {
              res.push(<Flex.Item key={jjj} style={[styles.grayBorderBox, flexItemStyle]} />);
            }
            pageRows.push(<Flex key={rowIndex}
              style={[styles.grayBorderBox, { borderBottomWidth: hasLine ? 1 : 0 }]}>
              {res}
            </Flex>);
          }
        }
        pagesArr.push(<View key={pageIndex} style={[styles.grayBorderBox, {
          borderTopWidth: hasLine && pageIndex !== 0 ? 1 : 0,
        }]}>{pageRows}</View>);
      }
    }

    return isCarousel && pageCount > 1 ? (
      <Carousel infinite={false} dots>{pagesArr}</Carousel>
    ) : <Flex direction="column">{rowsArr}</Flex>;
  }
}
