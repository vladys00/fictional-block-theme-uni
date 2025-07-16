import { RichText, BlockControls } from "@wordpress/block-editor"
import { ToolbarButton, ToolbarGroup } from "@wordpress/components"

 
wp.blocks.registerBlockType('ourblocktheme/genericheading', {
    title: "Generic Heading",
    attributes: {
        text:{type: "string"},
        size: {type: "string", default: "large"  },
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {
    function handleTextChange(x){
        props.setAttributes({text: x})
    }
    return (
         <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton isPressed={props.attributes.size === "large"} onClick={ () => props.setAttributes({size:"large"})}>Large</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "small"} onClick={ () => props.setAttributes({size:"small"})}>Small</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={ () => props.setAttributes({size:"medium"})}>Medium</ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
            <RichText
            value={props.attributes.text}
            onChange={handleTextChange}
            tagName="h1"
            className={`headline headline--${props.attributes.size}`}
            allowedFormats={["core/bold"]}
            />

         </>
    )
}

function SaveComponent() {
    return (
       <div>
           This is our heading block.
       </div>
    )
}