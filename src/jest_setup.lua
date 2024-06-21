for i, v in _G do
    if (typeof(i) == 'Instance' and i:IsA('ModuleScript')) then
        _G[i] = nil
    end
end

return {}