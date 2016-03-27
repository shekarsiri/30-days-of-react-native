/**
 * Day 20
 * Reminder
 */
'use strict';

import React,{Component,Image,StyleSheet,StatusBarIOS,Text,TextInput,LayoutAnimation,TouchableHighlight,View} from 'react-native';
import Util from './utils';
import {BlurView,VibrancyView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';

class ReminderContainer extends Component{
  static defaultProps = {
    listData:{
      title:"提醒事项",
      numOfItems:0,
      theme:"#fe952b",
      list:[]
    },
  };

  static propTypes = {
    listData: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      listData: this.props.listData,
    }
    this.animations = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        springDamping: 0.7,
      },
    };
  }

  _done(index) {
    const listData = this.state.listData;
    listData.list[index].selected = !listData.list[index].selected;
    this.setState({
      listData
    });
    LayoutAnimation.configureNext(this.animations);
  }

  _addList(text) {
    const listData = this.state.listData;
    listData.list.push({
      selected:false,
      text
    })
    this.refs.addList.setNativeProps({text: ''});
    this.setState({
      listData
    })
  }

  render() {
    const listData = this.state.listData;
    const list = listData.list.map((elem,index) => {
      return (
        <View ref={"list"+index} key={index} style={[styles.reminderList,{opacity:elem.selected?0.5:1}]}>
          <TouchableHighlight underlayColor="transparent" style={[styles.check,{borderColor: elem.selected?listData.theme:"#c6c6c6"}]} onPress = {() => this._done(index)}>
            <View style={elem.selected? styles.fill:null}></View>
          </TouchableHighlight>
          <View style={styles.input}>
            <TextInput defaultValue={elem.text} style={styles.inputText}/>
          </View>
        </View>
      );
    })
    list.push(
      <View key="add" style={styles.reminderList}>
        <TouchableHighlight style={styles.add}>
          <Icon name="plus" color="#c6c6c6" size={22}/>
        </TouchableHighlight>
        <View style={styles.input}>
          <TextInput autoCapitalize="none" ref="addList" onBlur={(event) => this._addList(event.nativeEvent.text)} style={styles.inputText}/>
        </View>
      </View>
    );
    return(
      <View style={styles.reminderContainer}>
        <Image style={styles.reminderBg} source={{uri:"packed"}}/>
        <View style={styles.reminderContent}>
          <TouchableHighlight>
            <View style={styles.reminderTitleContainer}>
              <Text style={[styles.reminderTitle,{color:listData.theme}]}>{listData.title}</Text>
              <Text style={[styles.reminderTitle,{color:listData.theme}]}>{listData.numOfItems}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.reminderListContainer}>
            {list}
          </View>
        </View>
      </View>
    );
  }
}

export default class extends Component{
  constructor() {
    super();
    this.listData = {
      title:"Development",
      numOfItems:6,
      theme:"#fe952b",
      list:[{
        selected:false,
        text:"day20",
      },{
        selected:false,
        text:"day21",
      },{
        selected:false,
        text:"day22",
      },{
        selected:false,
        text:"day23",
      },{
        selected:false,
        text:"day24",
      },{
        selected:false,
        text:"day25",
      }],
    };
  }

  componentDidMount() {
    StatusBarIOS.setStyle(1);
  }

  render() {
    return(
      <View style={styles.container}>
        <Image source={{uri:"desktop"}} style={styles.container}> 
          <BlurView blurType="dark" style={styles.container}>
          </BlurView>
        </Image>       
        <ReminderContainer listData={this.listData}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: Util.size.height,
    width: 375,
  },
  reminderContainer:{
    height: Util.size.height-65,
    width:375,
    borderRadius: 10,
    position:"absolute",
    top:20,
    left:0,
    backgroundColor:"#fff",
  },
  reminderBg:{
    height: Util.size.height-65,
    width:375,
    borderRadius: 10,
    resizeMode:"cover",
    opacity:0.5,
  },
  reminderContent:{
    height: Util.size.height-65,
    width:375,
    backgroundColor:"transparent",
    position:"absolute",
    top:0,
    left:0,
  },
  reminderTitleContainer:{
    height: 65,
    width: 375,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:15,
    paddingRight:15,
    alignItems:"center"
  },
  reminderTitle:{
    fontSize:28,
    fontWeight:"300",
    textShadowColor:"#ccc",
    textShadowOffset:{width:0, height:1,},
    textShadowRadius:1,
  },
  reminderListContainer:{
    flex:1,
    borderTopColor:"#ccc",
    borderTopWidth:1,
  },
  reminderList:{
    flexDirection:"row",
    paddingLeft:15,
    height:45,
    width:375,
    justifyContent:"space-between",
    alignItems:"center"
  },
  check:{
    backgroundColor:"transparent",
    borderWidth:1,
    borderColor:"#c6c6c6",
    width:22,
    height:22,
    borderRadius:11,
    shadowOffset:{
        width: 0,
        height: 1,
    },
    shadowRadius:1,
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    justifyContent:"center",
    alignItems:"center"
  },
  fill:{
    width:16,
    height:16,
    borderRadius:8,
    backgroundColor:"#fc571f"
  },
  input:{
    width:325,
    height:45,
    borderBottomWidth:1,
    borderBottomColor:"#ccc",
  },
  inputText:{
    height:43,
    color:"#363636",
  }
});

