// clear form
$targetForm.find('input, select, textarea').each(function(){
    if ($(this).prop('tagName').toLowerCase() === 'input') {
        if ($(this).attr('type') === 'hidden') {
            $(this).val('');
        } else if ($(this).attr('type') === 'text') {
            $(this).val('');
        } else if ($(this).attr('type') === 'radio') {
            $(this).prop('checked', false);
        } else if ($(this).attr('type') === 'checkbox') {
            $(this).prop('checked', false);
        }
    }
    
    if ($(this).prop('tagName').toLowerCase() === 'select') {
        $(this).val('');
    }
    
    if ($(this).prop('tagName').toLowerCase() === 'textarea') {
        $(this).val('');
    }
    
    // event execute
    var $this = $(this);
    var targetEvents = $._data($(this).get(0), 'events');
    if (targetEvents !== undefined && targetEvents.change !== undefined) {
        $.each(targetEvents['change'], function(i, o){
            $this.trigger(o.type);
        });
    }
});