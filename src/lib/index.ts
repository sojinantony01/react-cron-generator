import Cron, { CronProp } from './cron';
import { HEADER } from './meta';
import cronstrue from 'cronstrue/i18n';
import { unixToQuartz, quartzToUnix, detectCronFormat } from './utils/cron-converter';
import { validateCron, validateUnixCron, validateQuartzCron, isValidCron } from './utils/cron-validator';
import { useCronState } from './hooks/useCronState';
import { useTranslation } from './hooks/useTranslation';
import { CronProvider, useCronContext, useCronContextSafe } from './context/CronContext';

// Export all utilities
export {
  HEADER,
  cronstrue,
  unixToQuartz,
  quartzToUnix,
  detectCronFormat,
  validateCron,
  validateUnixCron,
  validateQuartzCron,
  isValidCron,
  useCronState,
  useTranslation,
  CronProvider,
  useCronContext,
  useCronContextSafe,
};

// Export types
export type { CronProp };
export * from './types';

// Default export
export default Cron;
