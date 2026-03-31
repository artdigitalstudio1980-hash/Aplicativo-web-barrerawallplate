import prisma from './prisma';

interface AuditLogEntry {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Records an action in the audit log
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        oldValues: entry.oldValues ? JSON.parse(JSON.stringify(entry.oldValues)) : undefined,
        newValues: entry.newValues ? JSON.parse(JSON.stringify(entry.newValues)) : undefined,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
      },
    });
  } catch (error) {
    // Audit logging should never break the main flow
    console.error('Audit log error:', error);
  }
}

/**
 * Extracts client info from a Request for audit logging
 */
export function getClientInfo(req: Request): { ipAddress: string; userAgent: string } {
  return {
    ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
    userAgent: req.headers.get('user-agent') || 'unknown',
  };
}
