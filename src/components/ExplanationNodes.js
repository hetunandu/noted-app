import React from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet
} from 'react-native';
import Markdown from 'react-native-simple-markdown'


export class TitleNode extends React.Component{
	render(){
		return <Text style={styles.title}>{this.props.data}</Text>
	}
}

export class TextNode extends React.Component{
	render(){
		return (
			<Markdown 
				whitelist={['strong']}
				styles={markdownStyles}
			>
				{this.props.data}
			</Markdown>
		)
	}
}

const markdownStyles = {
	text: {
		fontSize: 18,
	},
	paragraph: {
		marginBottom: 10,
		marginTop: 0
	},
	strong: {
		fontWeight: 'bold',
		color: 'red',
	}
}

export class QuoteNode extends React.Component{
	render(){
		return <Text style={styles.quote} >{this.props.data}</Text>
	}
}

export class ImageNode extends React.Component{
	render(){
		return (
			<Image
				style={{minHeight: 200, backgroundColor: "#f2f2f2", marginBottom: 10}}
				resizeMode="contain"
				source={{uri: `${this.props.data}`}}
			/>
		);
	}
}

export class PointerNode extends React.Component{
	render(){
		return (
			<View>
			{
				this.props.data.map((point, j) => {
					return (
						<View key={`point_${j}`} style={styles.pointer}>
							<View style={styles.pointerHead} >
								<Text style={styles.pointerIndex}>{j + 1}</Text>
								<Text style={styles.pointerTitle}>{point.title}</Text>
							</View>
							<View style={styles.pointNodes}>
								{
									point.nodes.map((node, k) => {
										switch(node.type){
											case 'text':
												return <TextNode key={k} data={node.data} />
											case 'image':
												return <ImageNode key={k} data={node.data} />
											default: 
												return <TextNode key={k} data={node.type} />
										}
									})
								}
							</View>
						</View>
					)
				})
			}
		</View>
		)
	}
}


const styles = StyleSheet.create({
	title: {
		marginTop: 5,
		marginBottom: 10,
		fontSize: 30,
		color: '#000',
		fontWeight: "100"
	},
	quote: {
		padding: 5,
		paddingLeft: 25,
		fontSize: 20,
		borderLeftWidth: 7,
		borderLeftColor: "red",
		color: "red",
		fontStyle: 'italic',
		marginBottom: 10
	},
	pointer:{
		marginBottom: 5
	},
	pointerHead:{
		flexDirection: 'row',
		alignItems: 'center',
	},
	pointerIndex: {
		fontSize: 30,
		color: '#000',
		fontWeight: "900"
	},
	pointerTitle: {
		paddingLeft: 10,
		fontSize: 20,
		fontWeight: "500",
		flexWrap: 'wrap'
	},
	pointNodes: {
		paddingLeft: 25
	},
})