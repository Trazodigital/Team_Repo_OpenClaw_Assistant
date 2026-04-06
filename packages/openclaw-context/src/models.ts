/**
 * Core domain models for OpenClaw Medical Assistant.
 * Consumers must import from here. Never redefine locally.
 */

export interface PatientRecord {
  id: string;
  transcript: string;
}
