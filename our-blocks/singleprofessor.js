wp.blocks.registerBlockType('ourblocktheme/singleprofessor', {
    title: "F.U Single Professor",
    edit: function (){
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "Single Professor placeholder")
    },
    save: function (){
        null
    }
})