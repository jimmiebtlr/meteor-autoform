// Setup the basic form
Template.basicForm.helpers({
  schema: function() {
    return new SimpleSchema({
      field: {
        type: String
      }
    });
  }
});

describe('AutoForm',function() {
  describe('getFieldValue',function() {
    var form = 'form';
    var field = 'field';
    var expected = 'expected';
    var div;

    beforeEach(function() {
      div = document.createElement('DIV');
      Blaze.render(Template.basicForm, div);
    });

    it('should get the correct value in a field',function() {
      $(div).find('input[name="' + field + '"]')[0].value = expected;

      expect(AutoForm.getFieldValue(field)).toBe(expected);
      expect(AutoForm.getFieldValue(field,form)).toBe(expected);
    });

    it('should return the value reactively',function(done) {
      Deps.autorun(function() {
        AutoForm.getFieldValue(field);
        if (AutoForm.getFieldValue(field) === expected) {
          expect(AutoForm.getFieldValue(field)).toBe(expected);
          done();
        }
      });

      $(div).find('input[name="' + field + '"]')[0].value = expected;
    });
  });
});
