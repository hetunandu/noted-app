import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {fetchConceptsFromChapter} from '../actions/concepts';
import { Actions } from 'react-native-router-flux';


class ChapterList extends Component {

	handleChapterPressed(chapter){
		Actions.conceptView({chapter})
		// Fetch the concepts
		this.props.fetchConceptsFromChapter(chapter.key)
	}

	// List of chapters in a subject. Will render a TouchableHighlight
	// and a chapter item inside it.
	_renderChapterList(){
		return this.props.chapters.data.map( chapter => {
			return(
				<TouchableHighlight
					style={styles.chapterListItemContainer}
					key={chapter.key}
					underlayColor="#333"
					onPress={this.handleChapterPressed.bind(this, chapter)}
				>
					<View style={styles.chapterListItem}>
						<Text style={styles.chapterListItemText}>
							{chapter.name}
						</Text>
						<Icon
							name="chevron-right"
							size={50}
							color="#333" 
						/>
					</View>
				</TouchableHighlight>
			);
		});
	}

	render(){
		return (
		  <View style={styles.container}>
			{
			  this.props.chapters.isFetching ? (
				<Text>Loading...</Text>
			  ) : this._renderChapterList()
			}
		  </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
	},
	chapterListItemContainer: {
		backgroundColor: 'white',
		borderBottomColor: '#333',
		borderBottomWidth: 1
	},
	chapterListItem: {
		flexDirection: 'row',
		padding: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	chapterListItemText: {
		fontSize: 23
	}
})

const mapStateToProps = ({chapters}) => ({
	chapters
})

const mapDispatchToProps = (dispatch) => ({
	fetchConceptsFromChapter: chapter_key => {
	  dispatch(fetchConceptsFromChapter(chapter_key))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)
