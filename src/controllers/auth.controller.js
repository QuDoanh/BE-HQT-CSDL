import { z } from 'zod'
import * as authService from '../services/auth.service.js'
import AppError from '../utils/AppError.js'
import catchAsync from '../utils/catchAsync.js'

const loginSchema = z.object({
  username: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
})

export const login = catchAsync(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400, 'VALIDATION_ERROR')
  }

  const { username, password } = parsed.data
  const result = await authService.login(username, password)

  res.json({ success: true, data: result })
})

export const logout = (req, res) => {
  res.json({ success: true, message: 'Đăng xuất thành công' })
}

export const getMe = catchAsync(async (req, res) => {
  const emp = await authService.getEmployeeInfo(req.user.employeeId)
  if (!emp) {
    throw new AppError('Không tìm thấy nhân viên', 404, 'EMPLOYEE_NOT_FOUND')
  }

  res.json({
    success: true,
    data: {
      employeeId: emp.EmployeeId,
      fullName: emp.FullName,
      phone: emp.Phone,
      email: emp.Email,
      username: emp.Username,
      roleId: emp.RoleId,
      roleName: emp.RoleName,
      isActive: !!emp.IsActive,
      isRoot: !!emp.IsRoot,
      hireDate: emp.HireDate,
      createdAt: emp.CreatedAt,
    },
  })
})
