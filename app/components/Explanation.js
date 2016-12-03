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
    render() {
        return(
        	<View style={{flex: 1}}>
        	    <ScrollView style={{flex: 1}}>
        	        <View style={{flex: 1, padding: 10}}>
        	            {
        	                this.props.data.map((node, i) => this._renderNodes(node, i))
        	            }
        	        </View>
        	    </ScrollView>
        	    {
        	        this.props.actions
        	    }
        	</View>
        );
    }
}

export default Explanation;
