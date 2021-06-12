/* eslint-disable react/no-unused-state */
import { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "@tarojs/components";
import {
  AtButton,
  AtNavBar,
  AtTabBar,
  AtDrawer,
  AtCard,
  AtTag,
  AtTabs,
  AtTabsPane,
} from "taro-ui";

import { add, minus, asyncAdd, topics } from "../../actions/counter";

import "./index.less";

const STATUS = {
  all: "全部",
  share: "分享",
  ask: "问答",
  job: "招聘",
  good: "精华",
};

const tabList = [
  { title: "全部" },
  { title: "分享" },
  { title: "问答" },
  { title: "招聘" },
  { title: "精华" },
];

@connect(
  ({ counter, cncode }) => ({
    counter,
    cncode,
  }),
  (dispatch) => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    },
    topics() {
      dispatch(topics());
    },
  })
)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      drawerState: false,
      current: 0,
    };
  }

  // eslint-disable-next-line react/sort-comp
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("props:\n", this.props, "\nnextProps\n", nextProps);
  }

  componentDidMount() {
    this.props.topics();
  }

  getData(data) {
    this.setState({
      topicsData: data,
    });
  }
  handleShowList = () => {
    this.setState({ drawerState: true });
  };
  handleClick2 = () => {
    console.log("handleClick2");
  };
  handleClick3 = () => {
    console.log("handleClick3");
  };
  onClose = () => {
    this.setState({ drawerState: false });
  };
  handleClick(value) {
    this.setState({
      current: value,
    });
  }

  render() {
    const { drawerState, current } = this.state;
    const { cncode: { topicsData: cardList } = { topicsData: [] } } =
      this.props;
    console.log(cardList);
    return (
      <View className="index">
        <AtNavBar
          onClickRgIconSt={this.handleShowList}
          onClickRgIconNd={this.handleClick2}
          onClickLeftIcon={this.handleClick3}
          color='#000'
          leftText='返回'
          rightFirstIconType='bullet-list'
          rightSecondIconType='user'
        >
          <AtDrawer
            show={drawerState}
            mask
            right
            onClose={this.onClose}
            items={["菜单1", "菜单2"]}
          ></AtDrawer>
          <View>CnNode</View>
        </AtNavBar>
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          {tabList.map((state, index) => (
            <AtTabsPane current={this.state.current} index={index} key={state.title}>
              {Array.isArray(cardList) &&
                cardList.map((topic) => {
                  if (state.title === STATUS["all"]) {
                    return (
                      <AtCard
                        key={topic.id}
                        className='topic-card'
                        note={topic.author.loginname}
                        extra={`${topic["reply_count"]}/${topic["visit_count"]}`}
                        title={topic.title}
                        thumb={topic.author["avatar_url"]}
                      >
                        <View>
                          <AtTag active={topic.top} size='small'>
                            {topic.top ? "置顶" : STATUS[topic.tab]}
                          </AtTag>
                          {topic.title}
                        </View>
                      </AtCard>
                    );
                  } else {
                    if (state.title === STATUS[topic.tab]) {
                      return (
                        <AtCard
                          key={topic.id}
                          className='topic-card'
                          note={topic.author.loginname}
                          extra={`${topic["reply_count"]}/${topic["visit_count"]}`}
                          title={topic.title}
                          thumb={topic.author["avatar_url"]}
                        >
                          <View>
                            <AtTag active={topic.top} size='small'>
                              {topic.top ? "置顶" : STATUS[topic.tab]}
                            </AtTag>
                            {topic.title}
                          </View>
                        </AtCard>
                      );
                    } else {
                      return <View></View>;
                    }
                  }
                })}
            </AtTabsPane>
          ))}
        </AtTabs>
        {/* <AtButton type='primary' className="test-btn" onClick={this.props.topics}>测试</AtButton> */}
        {/* <AtButton type='primary' className="test-btn" onClick={this.props.add}>+</AtButton> */}
        {/* <Text>{this.props.counter.num}</Text> */}
      </View>
    );
  }
}

export default Index;
