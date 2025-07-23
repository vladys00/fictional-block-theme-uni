import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

function Edit() {
    return (
        <div>
            Hello I'm the footer block in the editor!
        </div>
    )
}

registerBlockType(metadata.name, {
    edit: Edit
});