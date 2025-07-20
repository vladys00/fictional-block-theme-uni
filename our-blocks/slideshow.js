import { InnerBlocks } from '@wordpress/block-editor';
wp.blocks.registerBlockType('ourblocktheme/slideshow', {
    title: "Slideshow",
    supports: {
        align: ["full"]
    },
    attributes:{
        align:{type: "string", default: "full"   },
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props){
    return (
        <div style={{backGroundColor:"#3333", padding: "35px"}}>
            <p style={{textAlign:"center", fontSize:"20px", color:"#fff"}}>Slideshow</p>
            <InnerBlocks allowedBlocks={["ourblocktheme/slide"]}/>
            
        </div>
    )
}

function SaveComponent(){
    return <InnerBlocks.Content />
    
}