import debounce from '../debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should wait for x time before calling function', () => {
    const logger = text => `Logged with ${text}`;
    const timeout = 400;
    const debouncedLog = debounce(logger, timeout);
    const testText = `TEST_WAIT_${timeout}`;

    debouncedLog(testText);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  it('should clearTimeouts on every call', () => {
    const logger = 'Logged Test';
    const timeout = 400;
    const debouncedLog = debounce(logger, timeout);

    debouncedLog();
    debouncedLog();
    debouncedLog();
    debouncedLog();

    expect(setTimeout).toHaveBeenCalledTimes(4);
    expect(clearTimeout).toHaveBeenCalledTimes(4);
  });
});
