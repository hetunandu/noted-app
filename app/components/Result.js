import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import ConceptActions from './ConceptActions';
import {connect} from 'react-redux';
import { fetchSubjectList } from '../actions/subjects';
import {
  fetchRevisionConcepts,
  fetchTestConcepts,
  setMode
} from '../actions/concepts';
import { Actions } from 'react-native-router-flux';


class Result extends Component {

  handleTest(){
      const {fetchTestConcepts, subject, setMode} = this.props

      fetchTestConcepts(subject.key)
      setMode("question")

  }

  handleRevision(){
      const {fetchRevisionConcepts, subject, setMode} = this.props

      fetchRevisionConcepts(subject.key)
      setMode("study")
  }

  handleBack(){
      this.props.fetchSubjectList()
      Actions.pop()
  }

  _renderResult(){
    switch (this.props.mode) {
      case "question":
        return (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryInfo}>
                  Right
                </Text>
                <Text style={styles.summaryValue}>
                  {this.props.result.right}
                </Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryInfo}>
                  Wrong
                </Text>
                <Text style={styles.summaryValue}>
                  {this.props.result.wrong}
                </Text>
            </View>
          </View>
        )
      case "study":
        return (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryInfo}>
                  Revised
                </Text>
                <Text style={styles.summaryValue}>
                  {this.props.result.done}
                </Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryInfo}>
                  Skipped
                </Text>
                <Text style={styles.summaryValue}>
                  {this.props.result.skip}
                </Text>
            </View>
          </View>
        )
      default:
        return (<View></View>)

    }
  }


  render(){
    return (
      <View style={styles.resultContainer}>
          <Text style={styles.promoText}>
              Buy pro to get all concepts at once
          </Text>
          <View style={styles.resultInfoContainer}>
              <Text style={styles.resultText}>Session Summary</Text>
              {this._renderResult()}
          </View>
            {
              this.props.mode == "study" && (
                <View style={styles.resultActions}>
                  <ConceptActions
                      neutralText="Test revised concepts"
                      neutralPressed={() => this.handleTest()}
                  />
                  {
                    this.props.result.skip > 0 && (
                      <ConceptActions
                          neutralText="Revise skipped concepts"
                          neutralPressed={() => this.handleRevision()}
                      />
                    )
                  }
                  <ConceptActions
                      neutralText="Back to subjects"
                      neutralPressed={() => this.handleBack()}
                  />
                </View>
              )
            }
            {
              this.props.mode == "question" && (
                <View style={styles.resultActions}>
                  <ConceptActions
                      neutralText="Test again"
                      neutralPressed={() => this.handleTest()}
                  />
                  {
                    this.props.result.wrong > 0 && (
                      <ConceptActions
                          neutralText="Review wrong concepts"
                          neutralPressed={() => this.handleRevision()}
                      />
                    )
                  }
                  <ConceptActions
                      neutralText="Back to subjects"
                      neutralPressed={() => this.handleBack()}
                  />
                </View>
              )
            }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  resultContainer:{
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center'
  },
  resultInfoContainer:{
      flex: 3,
      justifyContent: 'center',
  },
  summaryContainer: {
    margin: 20,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 2
  },
  summaryRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4'
  },
  summaryInfo: {
    fontSize: 20,
    color: 'white'
  },
  summaryValue:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  promoText: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'red',
      padding: 10,
      fontSize: 20
  },
  resultText:{
      textAlign: 'center',
      fontSize: 25,
      color: 'white'
  },
  resultActions: {
      flex: 2,
      justifyContent: 'space-between',
      flexDirection: 'column'
  }
})


const mapStateToProps = ({result}) => ({
  result
})

const mapDispatchToProps = dispatch => ({
  fetchRevisionConcepts: (subject_key) => {
    dispatch(fetchRevisionConcepts(subject_key))
  },
  fetchTestConcepts: (subject_key) => {
    dispatch(fetchTestConcepts(subject_key))
  },
  fetchSubjectList: () => {dispatch(fetchSubjectList())},
  setMode: (mode) => {dispatch(setMode(mode))},

})

export default connect(mapStateToProps, mapDispatchToProps)(Result)
