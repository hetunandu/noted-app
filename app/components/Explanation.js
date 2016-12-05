import React from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableHighlight,
	StyleSheet
} from 'react-native';
import {
	TitleNode,
	TextNode,
	QuoteNode,
	ImageNode,
	PointerNode
} from './ExplanationNodes';


class Explanation extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			"mode": 'exp'
		}
	}


	_renderNodes(node, i){
		switch(node.type){
			case 'title':
				return <TitleNode key={i} data={node.data} />
			case 'text':
				return <TextNode key={i} data={node.data} />
			case 'image':
				return <ImageNode key={i} data={node.data} />
			case 'quote':
				return <QuoteNode key={i} data={node.data} />
			case 'pointers':
				return <PointerNode key={i} data={node.data} />
			default:
				return <Text key={i}>{node.type}</Text>
		}
	}

	handleLongPress(){
		if(this.state.mode == "exp"){
			this.setState({
				mode: 'ref'
			})
		}else{
			this.setState({
				mode: 'exp'
			})
		}
	}

	_renderReferences(){
		return (
			<TouchableHighlight
				underlayColor="#444"
				style={{flex: 1, padding: 10}}
				onLongPress={() => this.handleLongPress()}
			>
				<View style={{flex: 1}}>
					<Text style={styles.refTitle}>References</Text>
					{
						this.props.references.length > 0 ? (
							this.props.references.map( (ref, i) => {
									return (
										<View key={`ref_${i}`}>
											<Text style={styles.refText}>{ref.title}</Text>
											<Text style={styles.refText}>{ref.source}</Text>
										</View>
									)
							})
						) : (<Text style={styles.refText}>No References for this concept</Text>)
					}
					<Text style={styles.refTitle}>Tips</Text>
					{
						this.props.tips.length > 0 ? (
							this.props.tips.map( (tip, i) => {
								return (
									<Text key={`tip_${i}`} style={styles.refText}>
										{tip}
									</Text>
								)
							})
						) : (<Text style={styles.refText}>No Tips for this concept</Text>)

					}
				</View>
			</TouchableHighlight>
		)
	}

	_renderExplanation(){
		return (
			<ScrollView style={{flex: 1}}>
				<TouchableHighlight
					underlayColor="#f1f1f1"
					onLongPress={() => this.handleLongPress()}
				>
					<View style={{flex: 1, padding: 10}}>
						{this.props.explanation.map((node, i) => this._renderNodes(node, i))}
					</View>
				</TouchableHighlight>
			</ScrollView>
		)
	}

	_renderContents(){
		if(this.state.mode == "exp"){
			return this._renderExplanation()
		}else{
			return this._renderReferences()
		}
	}

	render() {
		return(
			<View style={[
				styles.explanation,
				this.state.mode == "ref" && styles.references
			]}>
					{
						this._renderContents()
					}
			</View>
			);
		}
	}

const styles = StyleSheet.create({
	explanation: {
		flex: 1,
		backgroundColor: 'white'
	},
	references: {
		backgroundColor: '#333'
	},
	refText: {
		color: '#fff',
		fontSize: 18,
		paddingLeft: 10
	},
	refTitle:{
		color: "#fff",
		marginTop: 10,
		fontSize: 35
	}
})

export default Explanation;
