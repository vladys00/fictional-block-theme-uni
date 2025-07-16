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

function SaveComponent(props) {
        function createTagName(){
        switch (props.attributes.size) {
            case "large":
                return "h1"
            case "medium":
/**
 * Renders the saved content of the Generic Heading block in the frontend.
 * 
 * @param {Object} props - The block properties passed from the WordPress block API.
 * @param {Object} props.attributes - The block attributes.
 * @param {string} props.attributes.text - The heading text content.
 * @param {string} props.attributes.size - The size of the heading (large, medium, or small).
 * @return {JSX.Element} A div element containing "Hello" text.
 */
function SaveComponent(props) {
    return <div>Hello</div>
}
                return "h2"
            case "small":
                return "h3"
            default:
                return "h1"
        }
    }
    return <RichText.Content value={props.attributes.text} tagName={createTagName()} className={`headline headline--${props.attributes.size}`} />
}