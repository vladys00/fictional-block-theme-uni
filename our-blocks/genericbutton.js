import { RichText, BlockControls, __experimentalLinkControl as LinkControl } from "@wordpress/block-editor"
import { ToolbarButton, ToolbarGroup, Popover, Button } from "@wordpress/components"
import { link } from "@wordpress/icons"
import { useState } from "@wordpress/element"
 
wp.blocks.registerBlockType('ourblocktheme/genericbutton', {
    title: "Generic Button",
    attributes: {
        text:{type: "string"},
        size: {type: "string", default: "large"  },
        linkObject: {type: "object", default: { url: ""}},
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {
    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

    function handleTextChange(x){
        props.setAttributes({text: x})
    }

    function buttonHandler(){
        setIsLinkPickerVisible(prev => !prev);
    }

    function handleLinkChange(newLink){
        props.setAttributes({linkObject: newLink})
    }
    return (
         <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton onClick={buttonHandler} icon={link}/>                
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton isPressed={props.attributes.size === "large"} onClick={ () => props.setAttributes({size:"large"})}>Large</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "small"} onClick={ () => props.setAttributes({size:"small"})}>Small</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={ () => props.setAttributes({size:"medium"})}>Medium</ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
            <RichText
            allowedFormats={[]}
            value={props.attributes.text}
            onChange={handleTextChange}
            tagName="a"
            className={`btn btn--${props.attributes.size} btn--blue`}
            />
            {isLinkPickerVisible &&(
                <Popover position="middle center">
                    <LinkControl
                        settings={[]}
                        value={props.attributes.linkObject}
                        onChange={handleLinkChange}
                    />
                    <Button  variant="primary" onClick={() => setIsLinkPickerVisible(false)} style={{display: "block", width:"100%"}}> Confirm Link </Button>
                </Popover>
            )}
         </>
    )
}

function SaveComponent(props) {
    return (
        <a href={props.attributes.linkObject.url} className={`btn btn--${props.attributes.size} btn--blue`}>{props.attributes.text}</a>
    )
}