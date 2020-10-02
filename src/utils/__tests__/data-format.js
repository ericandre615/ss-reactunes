import { displayDate } from '../date-format';

describe('displayDate', () => {
  it('should take a date and return the format "Month 2000"', () => {
    // expected format 2000-12-01T08:00:00Z
    const dateStr = '2000-12-01T08:00:00Z';
    const formattedDate = displayDate(dateStr);
    const expectedDate = 'December 2000';

    expect(formattedDate).toEqual(expectedDate);
  });

  it('should handle each month of the year', () => {
    const tests = [
      {
        date: '1998-11-01T08:00:00Z',
        expected: 'November 1998',
      },
      {
        date: '1986-10-08T08:00:00Z',
        expected: 'October 1986',
      },
      {
        date: '1998-09-01T08:00:00Z',
        expected: 'September 1998',
      }, {
        date: '1977-08-01T10:55:00Z',
        expected: 'August 1977',
      }, {
        date: '1992-07-04T08:00:00Z',
        expected: 'July 1992',
      }, {
        date: '1981-06-06T12:00:00Z',
        expected: 'June 1981',
      }, {
        date: '2011-05-01T08:00:00Z',
        expected: 'May 2011',
      }, {
        date: '1998-04-01T08:00:00Z',
        expected: 'April 1998',
      }, {
        date: '2020-03-01T07:35:00Z',
        expected: 'March 2020',
      }, {
        date: '2010-02-22T12:00:00Z',
        expected: 'February 2010',
      }, {
        date: '1996-01-18T11:00:00Z',
        expected: 'January 1996',
      }, {
        date: '1999-12-02T09:00:00Z',
        expected: 'December 1999',
      },
    ];

    tests.forEach(({ date, expected }) => {
      const formattedDate = displayDate(date);
      expect(formattedDate).toEqual(expected);
    });
  });
});
